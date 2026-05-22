import React from "react";
import logo from "../assets/icons/Mascot_and_Logo.svg";
import avatar from "../assets/icons/smallMascot.svg";
import mail from "../assets/icons/mark_email_unread.svg";

export default function Navbar() {
	return (
		<header className="w-full bg-transparent p-4">
			<div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
				<div className="flex items-center gap-3">
					<img src={logo} alt="FitFocus" className="w-36 h-auto" />
				</div>

				<div className="hidden md:flex items-center gap-2 text-gray-700">
					<h2 className="text-lg font-semibold">Mood Selection</h2>
				</div>

				<div className="flex items-center gap-3">
					<button className="p-2 rounded-lg hover:bg-gray-100">
						<img src={mail} alt="notification" className="w-6 h-6" />
					</button>

					<div className="flex items-center gap-2">
						<img src={avatar} alt="user" className="w-10 h-10 rounded-full" />
						<div className="hidden sm:block text-sm">
							<div className="font-medium text-gray-800">Hi, User</div>
							<div className="text-xs text-gray-500">Productivity Level</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

