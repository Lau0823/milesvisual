export function parsePlanDescription(descripcion: any, fallbackItems: any[] = []): string[] {
  let itemsList: string[] | null = null;
  
  if (descripcion) {
    let currentDesc = descripcion;
    let foundArray = false;
    try {
      while (typeof currentDesc === 'string') {
        const parsed = JSON.parse(currentDesc);
        if (typeof parsed === 'string') {
          currentDesc = parsed;
        } else if (Array.isArray(parsed)) {
          itemsList = parsed.map(String);
          foundArray = true;
          break;
        } else {
          break;
        }
      }
    } catch (e) {
      if (!foundArray) {
        const cleaned = String(currentDesc).replace(/^"|"$/g, '').replace(/^'|'$/g, '').replace(/\\"/g, '"');
        try {
          const parsed2 = JSON.parse(cleaned);
          if (Array.isArray(parsed2)) {
            itemsList = parsed2.map(String);
            foundArray = true;
          }
        } catch (e2) {}
      }
    }
    if (!foundArray) {
      const descStr = String(descripcion);
      // Fallback: If it's not JSON, maybe it's just text separated by dots.
      if (descStr.includes('. ') && !descStr.startsWith('["')) {
        itemsList = descStr.split('. ').filter(Boolean);
      } else {
        itemsList = [descStr];
      }
    }
  }
  
  return itemsList || fallbackItems || [];
}
