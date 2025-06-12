import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home";

const App = () => {
  const { loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [userLinks, setUserLinks] = useState([]);

  const handleShorten = async () => {
    try {
      const sub = user?.sub;
      const response = await axios.post("http://localhost:8000/shorturl/createURL", {
        url: originalUrl,
        sub: sub,
        customUrl: isAuthenticated ? customAlias : undefined,
        email: isAuthenticated ? user?.email : undefined
      });
      setShortUrl(response.data.data);
      fetchUserLinks();
    } catch (err) {
      console.error("Error creating short URL", err);
    }
  };

  const fetchUserLinks = async () => {
    if (!isAuthenticated) return;
    const sub = user?.sub;
    const token = await getAccessTokenSilently();
    console.log("token", token)
    try {
      const res = await axios.post(
        `http://localhost:8000/user/getShorturls`,
        { sub: sub },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserLinks(res.data.data);
    } catch (err) {
      console.error("Error fetching user URLs", err);
    }
  };

  async function storeDetails() {

    if (!isAuthenticated) {
      return;
    }
    try {
      const token = await getAccessTokenSilently();
      const username = user?.name;
      const email = user?.email;
      const sub = user?.sub;
      console.log("token", token)
      console.log("User : ", user);
      console.log(username, email);
      console.log("token", token);

      const response = await axios.post('http://localhost:8000/user/signup',
        {
          username,
          email,
          sub
        }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      console.log(response.data);
    } catch (e) {
      console.log("error while signUp :", e)
    }
  }

  useEffect(() => {
    if (isAuthenticated) storeDetails();
    if (isAuthenticated) fetchUserLinks();
  }, [isAuthenticated]);


  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black text-cyan-400">🔗 ShortURL Maker</h1>
        {!isAuthenticated ? (
          <button
            onClick={() => loginWithRedirect()}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg cursor-pointer"
          >
            Login
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <span className="font-semibold text-cyan-300">👤 {user?.name}</span>
            <button
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              className="bg-gray-800 text-white px-4 py-2 rounded-full font-semibold shadow"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      <Home
        originalUrl={originalUrl}
        setOriginalUrl={setOriginalUrl}
        handleShorten={handleShorten}
        isAuthenticated={isAuthenticated}
        loginWithRedirect={loginWithRedirect}
        customAlias={customAlias}
        setCustomAlias={setCustomAlias}
      />

      {shortUrl && (
        <section className="max-w-3xl mx-auto mt-10 bg-[#1e293b] text-white p-6 rounded-3xl shadow-xl border border-cyan-600">
          <p className="text-green-400 font-medium text-center">Your Short URL: <a href={shortUrl} className="underline" target="_blank">{shortUrl}</a></p>
        </section>
      )}

      {isAuthenticated && (
        <section className="max-w-3xl mx-auto mt-10 bg-[#1e293b] text-white p-6 rounded-3xl shadow-xl border border-cyan-600">
          <h2 className="text-xl font-bold mb-4 text-cyan-400">📂 Your Shortened Links</h2>
          <ul className="space-y-4">
            {userLinks.map((link, index) => (
              <li key={index} className="border-b border-cyan-800 pb-3">
                <p className="text-blue-300 font-semibold">Original: <a href={link?.originalURL} className="underline" target="_blank">{link.originalURL}</a></p>
                <p className="text-green-400">Short: <a href={link.shortURL} className="underline" target="_blank">{link.shortURL}</a></p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default App;
