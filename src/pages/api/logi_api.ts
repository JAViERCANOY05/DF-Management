const LoginAPI = {
  //for log-in users !
  logIn: async (user_credentials: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        mode: "no-cors", // Set the request mode to 'no-cors'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user_credentials),
      });
      if (response.ok) {
        const responseData = await response.json();
        return responseData;
      }
      throw new Error(response.status.toString());
    } catch (error) {
      throw error;
    }
  },
};

export default LoginAPI;
