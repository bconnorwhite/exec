
export default function stripFinalNewline(buffer: Buffer) {
  const lineFeed = typeof buffer === "string" ? "\n" : "\n".charCodeAt(0);
	const carriageReturn = typeof buffer === "string" ? "\r" : "\r".charCodeAt(0);
	if(buffer[buffer.length - 1] === lineFeed) {
		buffer = buffer.slice(0, buffer.length - 1);
	}
	if(buffer[buffer.length - 1] === carriageReturn) {
		buffer = buffer.slice(0, buffer.length - 1);
	}
	return buffer;
}
