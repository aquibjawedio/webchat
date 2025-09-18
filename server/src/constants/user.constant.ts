export const UserRoles = {
  USER: "user",
  ADMIN: "admin",
};

export const GroupChatRoles = {
  GROUP_MEMBER: "group_member",
  GROUP_ADMIN: "group_admin",
};

export const UserRolesEnum = Object.values(UserRoles);
export const GroupChatRolesEnum = Object.values(GroupChatRoles);
export const MAX_AVATAR_SIZE = 5 * 1024 * 1024;
export const ALLOWED_AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"];
