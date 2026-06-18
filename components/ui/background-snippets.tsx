export const Component = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-full w-full bg-[#070604] bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_760px_at_50%_180px,rgba(82,82,82,0.32),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,106,33,0.18),rgba(255,106,33,0.05)_24%,transparent_42%),linear-gradient(145deg,transparent_32%,rgba(35,142,248,0.16)_62%,rgba(106,195,74,0.14)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.58)_78%,rgba(0,0,0,0.86))]" />
    </div>
  );
};
