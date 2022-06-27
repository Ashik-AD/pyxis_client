import React, { FC, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import SideNav from "../../components/nav/SideNav";
import AllMovieTv from "../all/AllMovieTv";
import Movie from "../details/Movie";
import Person from "../details/Person";
import Tv from "../details/Tv";
import Index from "./pages/Index";
import Search from "../search/Search";
import DiscoverByGenre from "../discover/DiscoverByGenre";
import CollectionInfo from "../../components/collection/CollectionInfo";
import Collections from "../../components/collection/Collections";
import { StoreContext } from "../../store/Store";
import { ax } from "../../config/default";
import Like from "../liked/Like";
import WatchList from "../watchList/WatchList";
import Profile from "../profile/Profile";
import isConnectionAvailable from "../../utils/isConnAvailable";
import MobileNav from "../../components/nav/MobileNav";
const Home: FC = () => {
  const { store, dispatch } = useContext(StoreContext);
  useEffect(() => {
    let fetchCollections = null;

    if (store.user) {
      fetchCollections = async () => {
        const { data } = await ax.get(`${store.user.id}/playlist`);
        dispatch({ type: "SET_COLLECTION", payload: data });
      };
      fetchCollections();
    }
    return () => {
      fetchCollections = null;
    };
  }, [store.user, dispatch]);
  return (
    <section className="home flex">
      <SideNav />
      <div className="sm:hidden">
        <MobileNav />
      </div>
      {store.user && (
        <section className="content_container h-screen overflow-y-scroll w-full">
          {isConnectionAvailable() && (
            <Routes>
              <Route path="/*" element={<Index />} />
              <Route path="/movie/info/:id/*" element={<Movie />} />
              <Route
                path="/discover/:type/genre/:genre_id/*"
                element={<DiscoverByGenre />}
              />
              <Route path="/tv/info/:id/*" element={<Tv />} />
              <Route path="/liked" element={<Like />} />
              <Route path="/collection/:id" element={<CollectionInfo />} />
              <Route path="/collection" element={<Collections />} />
              <Route path="/watchlist" element={<WatchList />} />
              <Route path="/person/:person_id" element={<Person />} />
              <Route path="/all/:type/:src/*" element={<AllMovieTv />} />
              <Route path="/search/*" element={<Search />} />
              <Route path="/profile/*" element={<Profile />} />
            </Routes>
          )}
        </section>
      )}
    </section>
  );
};

export default Home;
