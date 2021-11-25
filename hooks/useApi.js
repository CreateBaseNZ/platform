import axios from "axios";
import useHandleResponse from "./useHandleResponse";

const useApi = () => {
	const { handleResponse } = useHandleResponse();

	const post = async ({ route = "", input = {}, failHandler = () => {}, successHandler = () => {} }) => {
		let data = {};
		try {
			data = (
				await axios.post(route, {
					PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
					input: input,
				})
			)["data"];
		} catch (error) {
			data.status = "error";
		} finally {
			console.log(data);
			handleResponse({
				data,
				failHandler: (data) => failHandler(data),
				successHandler: (data) => successHandler(data),
			});
		}
	};

	return post;
};

export default useApi;
