const AddContribution = {
  add: async (token: any, data: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/addContribution`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        const sentTo = {
          response: responseData,
          status: true,
        };

        return sentTo;
      }
      throw new Error("Something Went Wrong !");
    } catch (error) {
      throw error;
    }
  },
};

export default AddContribution;
