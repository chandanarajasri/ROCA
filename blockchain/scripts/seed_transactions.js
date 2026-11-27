const hre = require("hardhat");

async function main() {
  console.log("Generating controlled testbed transactions for ROCA validation...");

  const signers = await hre.ethers.getSigners();
  const [alice, bob, charlie, david] = signers;

  // Perform benchmark transactions matching ROCA verification tests (Sum = 15 ETH)
  // TX 1: Alice -> Bob (2 ETH)
  console.log("Executing TX001: Alice -> Bob (2 ETH)...");
  await alice.sendTransaction({
    to: bob.address,
    value: hre.ethers.parseEther("2.0"),
  });

  // TX 2: Bob -> Charlie (5 ETH)
  console.log("Executing TX002: Bob -> Charlie (5 ETH)...");
  await bob.sendTransaction({
    to: charlie.address,
    value: hre.ethers.parseEther("5.0"),
  });

  // TX 3: Alice -> David (1 ETH)
  console.log("Executing TX003: Alice -> David (1 ETH)...");
  await alice.sendTransaction({
    to: david.address,
    value: hre.ethers.parseEther("1.0"),
  });

  // TX 4: David -> Bob (3 ETH)
  console.log("Executing TX004: David -> Bob (3 ETH)...");
  await david.sendTransaction({
    to: bob.address,
    value: hre.ethers.parseEther("3.0"),
  });

  // TX 5: Alice -> Charlie (4 ETH)
  console.log("Executing TX005: Alice -> Charlie (4 ETH)...");
  await alice.sendTransaction({
    to: charlie.address,
    value: hre.ethers.parseEther("4.0"),
  });

  console.log("Seeded 5 controlled benchmark transactions. Total volume: 15.0 ETH.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
