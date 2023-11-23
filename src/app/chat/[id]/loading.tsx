const ChatLoadingPage = () => {
  return (
    <div className="grid h-full place-items-center rounded-xl border p-8">
      <div className="flex flex-col items-center gap-2">
        <span className="loading loading-ring loading-lg"></span>
        <p className="text-gray-400">Łaowanie</p>
      </div>
    </div>
  );
};

export default ChatLoadingPage;
