const GetUser = {
  user: async (token: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/fetchAllUser`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        const sendTo = {
          status: true,
          response: responseData,
        };
        return sendTo;
      }
      throw new Error();
    } catch (error) {
      throw error;
    }
  },
};

export default GetUser;
