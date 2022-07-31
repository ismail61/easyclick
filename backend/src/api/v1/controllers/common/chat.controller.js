
import { getAdminMessage } from "../../services/common";

function messageController() {
    return {

        getAdminMessages: async (req, res) => {
            const chats = await getAdminMessage({});
            const allChats = chats && chats?.map(chat => {
                return {
                    ...chat,
                    messages: chat.messages[chat?.messages?.length - 1]?.text
                }
            })
            return res.status(200).json(allChats);
        },
    }
}
export { messageController };