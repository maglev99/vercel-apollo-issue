# Vercel Apollo Issue Reproduction 

Issue:

- Functions that fetch tokens when visit or GET from route /api/fetch-test run locally but do not run when deployed (check logs) on vercel with no logs being produced after initial fetch start

- Issue happens in the fetchTokens() function in db-commands/fetch-tokens.ts

Instructions: 

- To view working version locally build and start project or 'npm run dev' and visit localhost:3000/api/fetch-test

- To reproduce issue deploy to vercel and visit DEPLOYED_URL/api/fetch-test