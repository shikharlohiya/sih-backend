const moment = require("moment");

const temp = (data) => {
  console.log(data);
  return `<!DOCTYPE html>
	<html lang="en">
	<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Document</title>
			<style>
					/* @import url("https://fonts.googleapis.com/css2?family=Staatliches&display=swap");
	@import url("https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap"); */
	
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	
	body,
	html {
		height: 100vh;
		display: grid;
		font-family: "Staatliches", cursive;
		background: #d83565;
		color: black;
		font-size: 14px;
		letter-spacing: 0.1em;
	}
	
	.ticket {
		height:100%;
		margin: auto;
		display: flex;
		background: white;
		box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
	}
	
	.left {
		display: flex;
	}
	
	.image {
		height: 400px;
		width: 100%;
		background-size: 100% 100%;
		opacity: 0.85;
		background-repeat:no-repeat;
	}
	
	.admit-one {
		position: absolute;
		color: darkgray;
		height: 250px;
		padding: 0 10px;
		letter-spacing: 0.15em;
		display: flex;
		text-align: center;
		justify-content: space-around;
		writing-mode: vertical-rl;
		transform: rotate(-180deg);
	}
	
	.admit-one span:nth-child(2) {
		color: white;
		font-weight: 700;
	}
	
	.left .ticket-number {
		height: 250px;
		width: 250px;
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		padding: 5px;
	}
	
	.ticket-info {
		padding: 10px 30px;
		display: flex;
		flex-direction: column;
		text-align: center;
		justify-content: space-between;
		align-items: center;
	}
	
	.date {
		border-top: 1px solid gray;
		border-bottom: 1px solid gray;
		padding: 5px 0;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	
	.date span {
		width: 100px;
	}
	
	.date span:first-child {
		text-align: left;
	}
	
	.date span:last-child {
		text-align: right;
	}
	
	.date .june-29 {
		color: #d83565;
		font-size: 20px;
	}
	
	.show-name {
		font-size: 32px;
		font-family: "Nanum Pen Script", cursive;
		color: #d83565;
	}
	
	.show-name h1 {
		font-size: 48px;
		font-weight: 700;
		letter-spacing: 0.1em;
		color: #4a437e;
	}
	
	.time {
		padding: 10px 0;
		color: #4a437e;
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 10px;
		font-weight: 700;
	}
	
	.time span {
		font-weight: 400;
		color: gray;
	}
	
	.left .time {
		font-size: 24px;
	}
	
	
	.location {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		padding-top: 8px;
		border-top: 1px solid gray;
	}
	
	.location .separator {
		font-size: 20px;
	}
	
	.right {
		width: 180px;
		border-left: 1px dashed #404040;
	}
	
	.right .admit-one {
		color: darkgray;
	}
	
	.right .admit-one span:nth-child(2) {
		color: gray;
	}
	
	.right .right-info-container {
		height: 400px;
		padding: 10px 10px 10px 35px;
		display: flex;
		flex-direction: column;
		-webkit-justify-content: space-around;
		-webkit-align-items: center;
	}
	
	.right .show-name h1 {
		font-size: 24px;
	}
	
	.barcode {
		height: 380px;
		width: 380px;
		margin-left: 100%;
	}
	
	.barcode img {
		height: 100%;
	}
	
	.right .ticket-number {
		color: gray;
	}
	
			</style>
	
	</head>
	<body>
			<div class="ticket">
					<div class="left">
							<div class="image">
									<p class="admit-one">
											<span>ADMIT ONE</span>
											<span>ADMIT ONE</span>
											<span>ADMIT ONE</span>
									</p>
									<div>
									<img scr="http://localhost:8000/${
                    data.monumentId.img
                  }" style="width:100%;heigth:100%;"/>
									</div>
									<div class="ticket-number">
											<p>
													#20030220
											</p>
									</div>
							</div>
							<div class="ticket-info">
									<p class="date">
											<span>TUESDAY</span>
											<span class="june-29">${moment(data.date).format("DD-MM-YYY")}</span>
											<span>2021</span>
									</p>
									<div class="show-name">
											<h1>${data?.ticketedUsers[0].name}</h1>
											<h2>${data?.ticketedUsers[0].idNumber}</h2>
									</div>
									<div class="time">
											<p>${data.monumentId.time}</p>
											<p>DOORS <span>@</span> 7:00 PM</p>
									</div>
									<p class="location"><span>East High School</span>
											<span class="separator"><i class="far fa-smile"></i></span><span>Salt Lake City, Utah</span>
									</p>
							</div>
					</div>
					<div class="right">
							<p class="admit-one">
									<span>ADMIT ONE</span>
									<span>ADMIT ONE</span>
									<span>ADMIT ONE</span>
							</p>
							<div class="right-info-container">
									<div class="barcode">
											<img src=${data?.qr} alt="QR code">
									</div>
									<p class="ticket-number">
											#20030220
									</p>
							</div>
					</div>
			</div>
	</body>
	</html>`;
};
module.exports = temp;
