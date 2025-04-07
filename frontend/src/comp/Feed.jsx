function FeedPage() {
    const posts = [
      {
        id: 1,
        username: "johndoe",
        content: "Just joined this awesome platform!",
        image: "https://via.placeholder.com/400x200"
      },
      {
        id: 2,
        username: "janedoe",
        content: "Loving the clean UI!",
        image: null
      },
      {
        id: 3,
        username: "alex99",
        content: "Here’s a cool pic I took on my hike yesterday.",
        image: "https://via.placeholder.com/400x250"
      }
    ];
  
    return (
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-center mb-6">User Feed</h2>
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-semibold text-blue-600">@{post.username}</h3>
              <p className="mt-2 text-gray-700">{post.content}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post Visual"
                  className="mt-4 w-full rounded-xl object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }



  export default FeedPage;