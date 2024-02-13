const ChangePass = {
  //change pass for user  !
  changePassword: async (newPassword: any, token: any) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/changePassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newPassword),
        }
      );
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

export default ChangePass;
