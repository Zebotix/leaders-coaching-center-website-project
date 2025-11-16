async function auth_admin_action() {
  try {
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export { auth_admin_action };
