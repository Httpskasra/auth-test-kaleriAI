import type { RandomUser } from "@context/AuthContext";

export class AuthService {
  static async fetchRandomUser(): Promise<RandomUser> {
    const res = await fetch("https://randomuser.me/api/?results=1&nat=us", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("failed to fetch user");
    const data = await res.json();
    const u = data.results[0];
    const user: RandomUser = {
      name: { first: u.name.first, last: u.name.last },
      email: u.email,
      picture: { large: u.picture.large },
      location: { city: u.location.city, country: u.location.country },
    };
    return user;
  }
}
