(function() {
    var filter = {
        "words": ["word"],
        "links": ["/username"],
    }

    function test(a) {
        if (typeof(filter["words"]) !== "undefined") {
            for (i = 0; i < filter["words"].length; i++) {
                if (a.tagName === "SPAN" && a.innerText) {
                    if (a.innerText.toLowerCase().includes(filter["words"][i].toLowerCase())) {
                        if (a.children.length === 0) {
                            if ((a.innerText.startsWith("#") || a.innerText.startsWith("@")) && !a.innerText.includes(" ")) {} else {
                                el = findUpTag(a, "ARTICLE")
                                el.style.filter = "blur(10px)"
                            }
                        }
                    }
                }
            }
        }
        if (typeof(filter["links"]) !== "undefined") {
            for (i = 0; i < filter["links"].length; i++) {
                if (a.href) {
                    if (a.href.endsWith(filter["links"][i])) {
                        el = findUpTag(a, "ARTICLE")
                        el.style.filter = "blur(10px)"
                    }
                }
            }
        }
    }

    function findUpTag(el, tag) {
        while (el.parentNode) {
            el = el.parentNode;
            if (el.tagName === tag)
                return el;
        }
        return null;
    }

    function allDescendants(node) {
        for (var i = 0; i < node.childNodes.length; i++) {
            var child = node.childNodes[i];
            allDescendants(child);
            test(child);
        }
    }

    const interval = setInterval(function() {
        var all = document.getElementsByTagName("article");
        for (var i = 0, max = all.length; i < max; i++) {
            if (all[i].style.filter === "") {
                allDescendants(all[i])
            }
        }
    }, 250);

})();