import proxmoxApi from "proxmox-api";
import { createClient } from "redis";
import { env } from "$env/dynamic/private";

const bytesToGB = 1024 ** 3;

export const load = async () => {
  const proxmox = proxmoxApi({
    host: "proxmox.local.tptlab.eu",
    password: env.PROXMOX_PASSWORD,
    username: env.PROXMOX_USERNAME,
  });

  if (env.ENABLE_REDIS == "true") {
    const redisClient = await createClient({ url: env.CACHE || "redis://127.0.0.1:6379"}).connect();

    const cachedVms = await redisClient.get("vms");
    const cachedUptime = await redisClient.get("uptime");
    const cachedMemUsed = await redisClient.get("memUsed");
    const cachedMemMax = await redisClient.get("memMax");
  

  
    const vms = (await proxmox.cluster.resources.$get({ type: "vm" })).length;
    const nodes = await proxmox.cluster.resources.$get({ type: "node" });
  
    const totalMaxMem = Math.round(
      nodes.reduce((sum, node) => sum + node.maxmem, 0) / bytesToGB
    );
    const totalUsedMem = Math.round(
      nodes.reduce((sum, node) => sum + node.mem, 0) / bytesToGB
    );
    const totalUptime = nodes.reduce((sum, node) => sum + node.uptime, 0);
  
    const uptimeInHours = Math.round(totalUptime / 3600);
  
    const ttl = 3600;
  
    await redisClient.setEx("vms", ttl, vms.toString());
    await redisClient.setEx("uptime", ttl, uptimeInHours.toString());
    await redisClient.setEx("memUsed", ttl, totalUsedMem.toString());
    await redisClient.setEx("memMax", ttl, totalMaxMem.toString());

    if (cachedVms && cachedUptime && cachedMemUsed && cachedMemMax) {
      return {
        vms: parseInt(cachedVms),
        uptime: parseInt(cachedUptime),
        memUsed: parseInt(cachedMemUsed),
        memMax: parseInt(cachedMemMax),
      };
    } else {
      return {
        vms,
        uptime: uptimeInHours,
        memUsed: totalUsedMem,
        memMax: totalMaxMem,
      };
    }
  }
};
