const DeleteContribution = {
  delete: async (token: any, id: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/deleteContribution/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        const sendTo = {
          response: responseData,
          status: true,
        };
        return sendTo;
      }
      throw new Error("Semething went wrong!");
    } catch (error) {
      throw error;
    }
  },
};
export default DeleteContribution;
