const handleProfileSave = async () => {
  await fetch(`http://localhost:5000/api/users/${userId}/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bio, location, skills }),
  });
};
