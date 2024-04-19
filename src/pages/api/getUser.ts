const GetUser = {
  user: async (searchQuery: any, token: any) => {
    let users;
    if (!searchQuery) {
      users = `${process.env.NEXT_PUBLIC_API_URL}/fetchAllUser`;
    } else {
      users = `${process.env.NEXT_PUBLIC_API_URL}/fetchAllUser?name=${searchQuery}`;
    }
    try {
      const response = await fetch(users, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
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
  release: async (token: any, id: any, data: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/release/${id}`,
        {
          method: "POST", // Change method to POST
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
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

  con: async (token: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/getContribution2`,
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
