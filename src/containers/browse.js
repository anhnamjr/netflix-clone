import React, { useContext, useState, useEffect } from "react";
import Fuse from "fuse.js"
import { SelectProfileContainer } from "./profile";
import { FooterContainer } from "../containers/footer"
import { FirebaseContext } from "../context/firebase";
import { Loading, Header, Card, Player } from "../components";
import * as ROUTES from "../constants/routes";

export function BrowseContainer({ slides }) {
  const [category, setCategory] = useState("series");
  const [searchTerm, setSearchTerm] = useState("");
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [slidesRow, setSlidesRow] = useState([]);

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [profile.displayName]);

  useEffect(() => {
    setSlidesRow(slides[category]);
  }, [slides, category]);

  useEffect(() => {
    const fuse = new Fuse(slidesRow, {
      keys: ["data.description", "data.title", "data.genre"]
    })

    const result = fuse.search(searchTerm).map(({item}) => item);

    if(slidesRow.length > 0 && searchTerm.length > 3 && result.length > 0) {
      setSlidesRow(result);
    } else {
      setSlidesRow(slides[category])
    }
  }, [searchTerm])

  return profile.displayName ? (
    <>
      {loading ? <Loading src={profile.photoURL} /> : <Loading.ReleaseBody />}
      <Header src="joker1" dontShowOnSmallViewPort>
        <Header.Frame>
          <Header.Group>
            <Header.Logo
              src="/images/logo.svg"
              alt="Netflix"
              to={ROUTES.HOME}
            />
            <Header.TextLink
              onClick={() => setCategory("series")}
              active={category === "series" ? true : false}
            >
              Series
            </Header.TextLink>
            <Header.TextLink
              onClick={() => setCategory("films")}
              active={category === "films" ? true : false}
            >
              Films
            </Header.TextLink>
          </Header.Group>
          <Header.Group>
            <Header.Group>
              <Header.Search
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </Header.Group>
            <Header.Profile>
              <Header.Picture src={user.photoURL} />
              <Header.Dropdown>
                <Header.Group>
                  <Header.Picture src={user.photoURL} />
                  <Header.TextLink>{user.displayName}</Header.TextLink>
                </Header.Group>
                <Header.Group>
                  <Header.TextLink onClick={() => firebase.auth().signOut()}>
                    Sign out
                  </Header.TextLink>
                </Header.Group>
              </Header.Dropdown>
            </Header.Profile>
          </Header.Group>
        </Header.Frame>
        <Header.Feature>
          <Header.FeatureCallOut>Watch Joker Now</Header.FeatureCallOut>
          <Header.Text>
            Forever alone in a crowd, failed comedian Arthur Fleck seeks
            connection as he walks the streets of Gotham City. Arthur wears two
            masks -- the one he paints for his day job as a clown, and the guise
            he projects in a futile attempt to feel like he's part of the word
            around him.
          </Header.Text>
          <Header.PlayButton>Play</Header.PlayButton>
        </Header.Feature>
      </Header>

      <Card.Group>
        {slidesRow.map((slideItem) => (
          <Card key={`${category}-${slideItem.title.toLowerCase()}`}>
            <Card.Title>{slideItem.title}</Card.Title>
            <Card.Entities>
              {slideItem.data.map((item) => (
                <Card.Item key={item.docId} item={item}>
                  <Card.Image
                    src={`/images/${category}/${item.genre}/${item.slug}/small.jpg`}
                  />
                  <Card.Meta>
                    <Card.SubTitle>{item.title}</Card.SubTitle>
                    <Card.Text>{item.description}</Card.Text>
                  </Card.Meta>
                </Card.Item>
              ))}
            </Card.Entities>
            <Card.Feature category={category} >
              <Player>
                <Player.Button />
                <Player.Video src="/videos/bunny.mp4"/>
              </Player>
            </Card.Feature>
          </Card>
        ))}
      </Card.Group>
      <FooterContainer />
    </>
  ) : (
    <SelectProfileContainer user={user} setProfile={setProfile} />
  );
}
