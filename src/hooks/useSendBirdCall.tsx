import SendBirdCall from "sendbird-calls";

interface AuthOptionType {
  userId: string;
  accessToken: string;
}

const useSendBirdInit = async ({ userId, accessToken }: AuthOptionType) => {
  SendBirdCall.init(process.env.NEXT_PUBLIC_SENDBIRD_APP_ID!);
  SendBirdCall.useMedia({ audio: true, video: false });

  const authOption = { userId, accessToken };
  try {
    await SendBirdCall.authenticate(authOption, (result, error) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log("인증 성공", result);
    });

    SendBirdCall.connectWebSocket()
      .then(() => {
        console.log("웹소켓 연결 성공");
      })
      .catch((error) => {
        console.error("웹소켓 연결 실패: ", error);
      });
  } catch {}
};

export { useSendBirdInit };
