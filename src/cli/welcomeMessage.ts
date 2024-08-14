import figlet from "figlet";

export const welcomeMessage = () => {
  console.log(
    figlet.textSync("TikTok Live Checker", {
      font: "Standard",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 120,
      whitespaceBreak: true,
    })
  );
};
