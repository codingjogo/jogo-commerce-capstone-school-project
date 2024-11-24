export function numberKeysOnly(e: React.KeyboardEvent<HTMLInputElement>) {
	// Allow: Backspace, Delete, Tab, Escape, Enter, and Arrow keys
	if (
		[
			"Backspace",
			"Delete",
			"Tab",
			"Escape",
			"Enter",
			"ArrowLeft",
			"ArrowRight",
		].includes(e.key)
	) {
		return;
	}
	// Prevent non-numeric keys
	if (!/^\d$/.test(e.key)) {
		e.preventDefault();
	}
}

export function isNumberKey(txt: string, evt: React.KeyboardEvent<HTMLInputElement>) {
  const charCode = evt.keyCode || evt.which;

  // Allow only numeric keys and a single decimal point
  if (charCode === 46) { // Decimal point
    return !txt.includes('.');
  }

  // Allow backspace and control keys
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }

  return true;
}

export function getAvailableSizes(selectedSizes: string[], allSizes: string[]) {
  return allSizes.filter((size) => !selectedSizes.includes(size));
}