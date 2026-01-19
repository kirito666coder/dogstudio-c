import Image from "next/image";

export default function BackGroundImages() {
  return (
    <div className="images">
      {["tommorowland", "navy-pier", "msi-chicago", "phone", "kikk", "kennedy", "opera"].map(
        item => (
          <Image key={item} src={`/${item}.png`} alt={item} height={2000} width={2000} />
        )
      )}
    </div>
  );
}
