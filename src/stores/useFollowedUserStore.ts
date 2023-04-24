import { create } from "zustand";
import { persist } from 'zustand/middleware'

type FollowedUser = Record<string, boolean>;

export interface FollowedUserStore {
    followedUser: FollowedUser;
    followUser: (username: string) => void;
    unfollowUser: (username: string) => void;
    reset: () => void;
}

const useFollowedUserStore = create<FollowedUserStore>()(persist((set, get) => ({
    followedUser: {},
    followUser: (username) => {
        set({followedUser: {...get().followedUser, [username]: true}})
    },
    unfollowUser: (username) => {
        set({followedUser: {...get().followedUser, [username]: false}})
    },
    reset: () => {
        set({followedUser: {}});
    }
}), {name: ""}));

export default useFollowedUserStore;