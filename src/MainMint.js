import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import roboPunksNFT from './RoboPunksNFT.json';

const roboPunksNFTAddress = '0xa3A809974b6DcD6D7842fd79D2c922d6da54a687';

const MainMint = ({ accounts, setAccounts }) => {
	const [ mintAmount, setMintAmmount ] = useState(1);
	const isConnected = Boolean(accounts[0]);

	async function handleMint() {
		if (window.ethereum) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(roboPunksNFTAddress, roboPunksNFT.abi, signer);
			try {
				const res = await contract.mint(BigNumber.from(mintAmount));
				console.log('RESPONSE', res);
			} catch (error) {
				console.log('EEROR', error);
			}
		}
	}

	const handleDecrement = () => {
		if (mintAmount <= 1) return;
		setMintAmmount(mintAmount - 1);
	};
	const handleIncrement = () => {
		if (mintAmount >= 3) return;
		setMintAmmount(mintAmount + 1);
	};
	return (
		<Flex justify="center" align="center" height="100vh" paddingBottom="150px">
			<Box width="520px">
				<div>
					<Text fontSize="48px" textShadow="0 5px #0000000">
						RoboPunks
					</Text>
					<Text fontSize="30px" textShadow="0 2px 2px #0000000" letterSpacing="-5.5%" fontFamily="VT323">
						It's 2078, Can the RoboPunks NFT save humans from Destructive rmpant NFT specualation? Mint
						Robopunks to find out.
					</Text>
				</div>

				{isConnected ? (
					<div>
						<Flex align="center" justify="center">
							<Button
								backgroundColor="#D6517D"
								borderRadius="5px"
								boxShadow="0px 2px 2px 1px #0F0F0F"
								color="white"
								cursor="pointer"
								fontFamily="inherit"
								padding="15px"
								marginTop="10px"
								onClick={handleDecrement}
							>
								-
							</Button>
							<Input
								readOnly
								fontFamily="inherit"
								width="100%"
								height="40px"
								textAlign="center"
								paddingLeft="19px"
								marginTop="10px"
								type="number"
								value={mintAmount}
							/>
							<Button
								backgroundColor="#D6517D"
								borderRadius="5px"
								boxShadow="0px 2px 2px 1px #0F0F0F"
								color="white"
								cursor="pointer"
								fontFamily="inherit"
								padding="15px"
								marginTop="10px"
								onClick={handleIncrement}
							>
								+
							</Button>
						</Flex>
						<Button
							backgroundColor="#D6517D"
							borderRadius="5px"
							boxShadow="0px 2px 2px 1px #0F0F0F"
							color="white"
							cursor="pointer"
							fontFamily="inherit"
							padding="15px"
							marginTop="10px"
							onClick={handleMint}
						>
							Mint
						</Button>
					</div>
				) : (
					<Text>You are not coonected yet</Text>
				)}
			</Box>
		</Flex>
	);
};

export default MainMint;
