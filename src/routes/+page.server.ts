import proxmoxApi from "proxmox-api";
import { createClient } from "redis";
import { PROXMOX_USERNAME, PROXMOX_PASSWORD, CACHE } from "$env/static/private";

const bytesToGB = 1024 ** 3;
const redisClient = await createClient({ url: CACHE }).connect();

export const load = async () => {
  const proxmox = proxmoxApi({
    host: "proxmox.local.tptlab.eu",
    password: PROXMOX_PASSWORD,
    username: PROXMOX_USERNAME,
  });

  const cachedVms = await redisClient.get("vms");
  const cachedUptime = await redisClient.get("uptime");
  const cachedMemUsed = await redisClient.get("memUsed");
  const cachedMemMax = await redisClient.get("memMax");

  if (cachedVms && cachedUptime && cachedMemUsed && cachedMemMax) {
    return {
      vms: parseInt(cachedVms),
      uptime: parseInt(cachedUptime),
      memUsed: parseInt(cachedMemUsed),
      memMax: parseInt(cachedMemMax),
    };
  }

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

  return {
    vms,
    uptime: uptimeInHours,
    memUsed: totalUsedMem,
    memMax: totalMaxMem,
  };
};
