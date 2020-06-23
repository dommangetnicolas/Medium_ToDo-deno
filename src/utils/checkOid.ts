const checkOid = (oid: string) => {
  return new RegExp("^[0-9a-fA-F]{24}$").test(oid);
};

export default checkOid;
