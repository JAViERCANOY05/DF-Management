const CreateAccount = {
  //for log-in users !
  create: async (user_credentials: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/createUser`, {
        method: "POST",
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

export default CreateAccount;
