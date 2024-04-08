const GetAllTransaction = {
  get: async (token: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/getAllTransaction`,
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
  getSelf: async (token: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/getSelfTransaction`,
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

export default GetAllTransaction;
