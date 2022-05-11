export const getInitials = (fullName: string) => {
  const nameParts = fullName.split(" ");
  return nameParts.map((n) => n.charAt(0).toUpperCase()).join("");
};
