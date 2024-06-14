import React from 'react'

const RepositoryInfo = () => {
    const repository = {
        name: "next-auth-session",
        full_name: "LoreArtx/next-auth-session",
        description: "A project demonstrating next-auth session handling.",
        html_url: "https://github.com/LoreArtx/next-auth-session",
        stargazers_count: 25,
        forks_count: 10,
        open_issues_count: 5,
        owner: {
            login: "LoreArtx",
            avatar_url: "https://avatars.githubusercontent.com/u/123456?v=4",
        }
    };
    return (
        <div className="bg-white p-4 rounded shadow-lg">
            <div className="flex items-center mb-4">
                <img src={repository.owner.avatar_url} alt={repository.owner.login} className="w-12 h-12 rounded-full mr-4" />
                <div>
                    <h2 className="text-2xl font-semibold">{repository.name}</h2>
                    <p className="text-sm text-gray-600">{repository.description}</p>
                </div>
            </div>
            <div className="mb-4">
                <a href={repository.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    View on GitHub
                </a>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                    <h3 className="text-lg font-semibold">Stars</h3>
                    <p>{repository.stargazers_count}</p>
                </div>
                <div className="text-center">
                    <h3 className="text-lg font-semibold">Forks</h3>
                    <p>{repository.forks_count}</p>
                </div>
                <div className="text-center">
                    <h3 className="text-lg font-semibold">Open Issues</h3>
                    <p>{repository.open_issues_count}</p>
                </div>
            </div>
        </div>
    );
}

export default RepositoryInfo