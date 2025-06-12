
const Home = ({
    originalUrl,
    setOriginalUrl,
    handleShorten,
    isAuthenticated,
    loginWithRedirect,
    customAlias,
    setCustomAlias
}: {
    originalUrl: string;
    setOriginalUrl: (url: string) => void;
    handleShorten: () => void;
    isAuthenticated: boolean;
    loginWithRedirect: () => void;
    customAlias: string;
    setCustomAlias: (alias: string) => void;

}) => {
    return (
        <section className="max-w-3xl mx-auto bg-[#0f172a] text-white p-8 rounded-3xl shadow-2xl mt-10 border border-sky-500">
            <h1 className="text-4xl font-extrabold mb-4 text-center text-cyan-400">🚀 Shorten Your Links Instantly</h1>
            <p className="text-center text-lg mb-10">
                Turn long, messy URLs into short, shareable links in one click.
            </p>
            {!isAuthenticated &&
                <p className="mb-6 text-center text-sm text-sky-200">
                    <strong className="text-cyan-400 cursor-pointer hover:underline" onClick={() => loginWithRedirect()}>Login</strong> to unlock <span className="font-semibold">custom urls</span> and manage all your links easily!
                </p>
            }
            <input
                type="text"
                placeholder="🔗 Paste your original URL here..."
                className="w-full border border-sky-500 focus:ring-cyan-400 focus:border-cyan-400 p-3 rounded-full mb-4 text-sm text-white"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
            />

            {isAuthenticated && (
                <input
                    type="text"
                    placeholder="    create your custom short url (optional)"
                    className="w-full border border-cyan-500 focus:ring-cyan-400 focus:border-cyan-400 p-3 rounded-full mb-4 text-white"
                    value={customAlias}
                    onChange={(e) => setCustomAlias(e.target.value)}
                />
            )}
            <div className="text-center">
                <button
                    onClick={handleShorten}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-2 rounded-full font-bold shadow-lg transition cursor-pointer"
                >
                    ✂️ Get Short URL
                </button>
            </div>
        </section>
    );
};

export default Home;