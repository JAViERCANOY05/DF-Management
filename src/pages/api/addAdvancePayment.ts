const AddvancePaymentni = {
    trans: async (token: any,  data : any ) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/advancePayment`,
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
          const sendTo = {
            status: true,
            response: responseData,
          };
          return sendTo;
        }
        throw new Error("Something went wrong  ");
      } catch (error) {
        throw error;
      }
    },
  };
  
  export default AddvancePaymentni;
  