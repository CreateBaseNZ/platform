import { Server } from "socket.io";

export default async function (req, res) {
	if (!res.socket.server.io) {
		const io = new Server(res.socket.server);
		io.on("connection", (socket) => {
			socket.on("trigger", (...data) => {
				const channel = data.shift();
				io.emit(channel, data);
			});
		});
		res.socket.server.io = io;
	}
	return res.end();
}
