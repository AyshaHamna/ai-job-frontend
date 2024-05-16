import { useUser } from "@clerk/clerk-react";

export const useUserRole = async () => {
  const { user } = useUser();
  console.log("user: ", user?.publicMetadata.role);

  return user?.publicMetadata.role;
};

// export const useUserRole = (): string => {
//     const { getToken } = useAuth();

//    return user.publicMetadata.role;
//    return console.log("token: ", getToken);
//   };
