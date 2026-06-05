const dns = require('node:dns');
const mongoose = require('mongoose');

const configureDnsForSrv = () => {
    const uri = process.env.MONGO_URI || '';

    if (!uri.startsWith('mongodb+srv://')) {
        return;
    }

    const configuredServers = process.env.DNS_SERVERS
        ? process.env.DNS_SERVERS.split(',').map((server) => server.trim()).filter(Boolean)
        : [];

    const currentServers = dns.getServers();
    const shouldUsePublicDns = currentServers.length === 0
        || currentServers.every((server) => server === '127.0.0.1' || server === '::1');

    if (configuredServers.length > 0) {
        dns.setServers(configuredServers);
        return;
    }

    if (shouldUsePublicDns) {
        dns.setServers(['1.1.1.1', '8.8.8.8']);
    }
};

const connectDb = async() => {
    try{
        configureDnsForSrv();

        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log(`MongoDB Connected...`);
    }
    catch(error){
        console.log("Database connection failed: ", error.message);
        process.exit(1);
    }
};

module.exports=connectDb;
