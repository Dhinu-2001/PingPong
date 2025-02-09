"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MapPin,
  Briefcase,
  Star,
  ChevronDown,
} from "lucide-react";
import userAxiosInstance from "../../axios/UserAxios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"

export default function SearchUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userAxiosInstance.get("/users");

        console.log("response", res);

        setUsers(res.data);
        setLoading(false);
      } catch (error) {
        console.error("error", error);
        setLoading(false);
        setError(true);
        // toast.warning(error?.response?.data?.message || "An error occured");
      }
    };

    fetchData();
  }, []);

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <div className="min-w-0 m-4 ml-0 bg-white rounded-2xl">
      {/* Header */}
      {/* <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-semibold text-gray-900">Search Users</h1>
            <div className="flex items-center gap-2">
              <button variant="outline" className="text-sm">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
              <button className="text-sm">Add New User</button>
            </div>
          </div>
        </div>
      </header> */}

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold mb-4">Search</h2>
              <div className="relative">
                <Search className="absolute lg:left-3 top-1/2 z-10 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="lg:pl-10 pl-4"
                />
              </div>
            </div>

            {/* <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              <div>
                <h2 className="font-semibold mb-4">Role</h2>
                <div className="space-y-2">
                  {["Designer", "Developer", "Product Manager", "Marketing"].map((role) => (
                    <label key={role} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="text-sm text-gray-600">{role}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-semibold mb-4">Experience Level</h2>
                <div className="space-y-2">
                  {["Entry Level", "Intermediate", "Senior", "Lead"].map((level) => (
                    <label key={level} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="text-sm text-gray-600">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-semibold mb-4">Location</h2>
                <div className="space-y-2">
                  {["Remote", "On-site", "Hybrid"].map((location) => (
                    <label key={location} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-blue-600" />
                      <span className="text-sm text-gray-600">{location}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div> */}
          </div>

          {/* Search Results */}
          <div className="md:col-span-3 space-y-6">
            {/* Filters */}

            {users.length === 0 ? (
              <div className="flex w-full h-full items-center justify-center">
                <h1 className="text-2xl font-medium">No users</h1>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  {users.map((user) => (
                    // <Link to={`home/chat/${user.id}/`}>
                      <div
                        key={user.id}
                        className="bg-white rounded-lg shadow-sm p-6"
                      >
                        <div className="flex items-start gap-4">
                          {/* <img
                            src={user.profile_picture || "/placeholder.svg"}
                            alt={user.username}
                            width={64}
                            height={64}
                            className="rounded-full"
                          /> */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-semibold text-gray-900">
                                  {user.username}
                                </h3>
                                {/* <p className="text-sm text-gray-500">{user.role}</p> */}
                              </div>
                              <Link to={`/home/chat/${user.id}/`}>
                                <button variant="outline" size="sm">
                                  Chat
                                </button>
                              </Link>
                            </div>

                            {/* <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {user.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {user.experience}
                        </div>
                      </div> */}

                            {/* <div className="mt-4 flex flex-wrap gap-2">
                        {user.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div> */}

                            {/* <div className="mt-4 flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4" fill={i < user.rating ? "currentColor" : "none"} />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">({user.reviews} reviews)</span>
                      </div> */}
                          </div>
                        </div>
                      </div>
                   
                  ))}
                </div>

                {/* <div className="text-center">
                  <button variant="outline" className="text-sm">
                    Load More
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </button>
                </div> */}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// const users = [
//   {
//     id: 1,
//     name: "Sarah Wilson",
//     role: "Senior UX Designer",
//     location: "San Francisco, CA",
//     experience: "5 years",
//     avatar: "/placeholder.svg",
//     skills: ["UI Design", "User Research", "Figma", "Prototyping"],
//     rating: 5,
//     reviews: 48,
//   },
//   {
//     id: 2,
//     name: "Michael Chen",
//     role: "Full Stack Developer",
//     location: "Remote",
//     experience: "7 years",
//     avatar: "/placeholder.svg",
//     skills: ["React", "Node.js", "TypeScript", "AWS"],
//     rating: 4,
//     reviews: 32,
//   },
//   {
//     id: 3,
//     name: "Emily Rodriguez",
//     role: "Product Manager",
//     location: "New York, NY",
//     experience: "6 years",
//     avatar: "/placeholder.svg",
//     skills: ["Strategy", "Agile", "User Stories", "Analytics"],
//     rating: 5,
//     reviews: 27,
//   },
//   {
//     id: 4,
//     name: "David Kim",
//     role: "UI Developer",
//     location: "Los Angeles, CA",
//     experience: "4 years",
//     avatar: "/placeholder.svg",
//     skills: ["HTML/CSS", "JavaScript", "React", "Tailwind"],
//     rating: 4,
//     reviews: 19,
//   },
//   {
//     id: 3,
//     name: "Emily Rodriguez",
//     role: "Product Manager",
//     location: "New York, NY",
//     experience: "6 years",
//     avatar: "/placeholder.svg",
//     skills: ["Strategy", "Agile", "User Stories", "Analytics"],
//     rating: 5,
//     reviews: 27,
//   },
//   {
//     id: 4,
//     name: "David Kim",
//     role: "UI Developer",
//     location: "Los Angeles, CA",
//     experience: "4 years",
//     avatar: "/placeholder.svg",
//     skills: ["HTML/CSS", "JavaScript", "React", "Tailwind"],
//     rating: 4,
//     reviews: 19,
//   },
// ]
