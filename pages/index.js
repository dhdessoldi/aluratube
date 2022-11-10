import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { StyledFavorites } from "../src/components/Favorites";

function HomePage() {

    const [valorDoFiltro, setValorDoFiltro] = React.useState("");


    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,

            }}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <TimeLine searchValue={valorDoFiltro} playlists={config.playlists}>
                    Conteúdo
                </TimeLine>
                {/* <Favorite favorites={config.favorites} /> */}
            </div>

        </>
    );
}

export default HomePage

const StyledHeader = styled.div`
    .banner {
        background-image: url("https://images.unsplash.com/photo-1638444458366-060c19121512?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80");
        background-size: cover;
        background-position-y: 40%;
        height: 230px;
    }
    
    .user-photo {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;
function Header() {
    return (

        <StyledHeader>
            <section className="banner">

            </section>

            <section className="user-info">
                <img className="user-photo" src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function TimeLine({ searchValue, ...propriedades }) {

    const playlistNames = Object.keys(propriedades.playlists);
    return (
        <StyledTimeline>
            {playlistNames.map(function (playlistName) {
                const videos = propriedades.playlists[playlistName];
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos
                                .filter((video) => {
                                    const titleNormalized = video.title.toLowerCase();
                                    const searchValueNormalized = searchValue.toLowerCase();
                                    return titleNormalized.includes(searchValueNormalized)
                                })
                                .map((video) => {
                                    return (
                                        <a key={video.url} href={video.url}>
                                            <img src={video.thumb} />
                                            <span>
                                                {video.title}
                                            </span>
                                        </a>
                                    )
                                })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}


// function Favorite(propriedades) {
//     const favoritesNames = Object.keys(propriedades.favorites);
//     return (
//         <StyledFavorites>
//             {favoritesNames.map(function (favoritesNames) {
//                 const channels = propriedades.favorites[favoritesNames];
//                 return (
//                     <section>
//                         <h2>{favoritesNames}</h2>
//                         <div>
//                             {channels.map((channel) => {
//                                 return (
//                                     <a href={channel.channel_url}>
//                                         <img src={channel.channel_img} />
//                                         <span>
//                                             {channel.channel_name}
//                                         </span>
//                                     </a>
//                                 )
//                             })}
//                         </div>
//                     </section>
//                 )
//             })}
//         </StyledFavorites>
//     )
// }