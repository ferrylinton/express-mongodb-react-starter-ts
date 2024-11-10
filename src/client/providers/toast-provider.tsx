import * as Toast from "@radix-ui/react-toast";
import { PropsWithChildren, createContext, useContext, useState } from 'react';

export const ToastContext = createContext<ToastContextProps>({
	toast: () => Function()
});

export const ToastProvider = ({ children }: PropsWithChildren) => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");

	const toast = (message: string) => {
		console.log("message : ", message)
		setMessage(message);
		setOpen(true);
	};

	const value: ToastContextProps = {
		toast
	};

	return (
		<ToastContext.Provider value={value}>
			<Toast.Provider duration={5000}>
				{children}
				<Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
					<Toast.Description asChild>
						<p>{message}</p>
					</Toast.Description>
					<Toast.Close aria-label="Close">
						<span aria-hidden>×</span>
					</Toast.Close>
				</Toast.Root>
				<Toast.Viewport className="ToastViewport" />
			</Toast.Provider>
		</ToastContext.Provider>
	);
};

export const useToastContext = () => useContext(ToastContext);
