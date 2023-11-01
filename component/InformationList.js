export default function InformationList({OID,OIDName,OIDinformation}){
    return(
        <div>
            <span>{OID}</span><span>{OIDName}</span><span>{OIDinformation}</span>
        </div>
    );
}