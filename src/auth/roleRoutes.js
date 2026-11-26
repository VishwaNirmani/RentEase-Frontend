export function getDashboardPathForRole(role) {
  switch (role) {
    case "Tenant":
      return "/";
    case "Owner":
      return "/owner/dashboard";
    case "Admin":
      return "/admin/dashboard";
    default:
      throw new Error("The account has an unsupported role.");
  }
}
