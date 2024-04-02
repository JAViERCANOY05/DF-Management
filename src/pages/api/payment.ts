interface PayParams {
  name: string;
  number: string; // Assuming 'number' is something like a phone number or credit card number which would be a string; change to 'number' if it's actually meant to be a numeric type
  paymentMethod: string; // Adjust according to what this actually is, e.g., 'credit', 'debit', etc.
  email: string;
  amount: number; // Assuming this is a numeric value representing an amount of money
  selectedImage: File | null; // Assuming this is a file, adjust if it's a different type
}

const Payment = {
  pay: async (token: any, id: string, data: any) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("paymentMethod", data.paymentMethod);
      formData.append("email", data.email);
      formData.append("amount", data.amount);

      if (data.image) {
        formData.append("image", data.image);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/makePayment/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            // Content-Type is set automatically by the browser when using FormData
          },
          body: formData,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        return {
          status: true,
          response: responseData,
        };
      }
      throw new Error("Something went wrong!");
    } catch (error) {
      console.error("Payment error:", error);
      throw error;
    }
  },
};

export default Payment;
