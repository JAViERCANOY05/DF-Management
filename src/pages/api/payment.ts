const Payment = {
  pay: async (token: any, id: any, formData: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/makePayment/${id}`,
        {
          method: "POST",
          headers: {
            
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          // body: JSON.stringify(data),
          body: formData,

        }
      );
      if (response.status) {
        const responseData = await response.json();
        const sendTo = {
          status: true,
          response: responseData,
        };
        return sendTo;
      }
      throw new Error("Something went wrong ! ");
    } catch (error) {
      throw error;
    }
  },
};

export default Payment;
