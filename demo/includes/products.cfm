<cfsetting showdebugoutput="false">
<cfset products = ["product 1","product 2","product 3"]>

<cfloop array="#products#" index="product">
	<cfoutput>#product#</cfoutput><br/>
</cfloop>
