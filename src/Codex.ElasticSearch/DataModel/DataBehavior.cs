﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Codex.Storage.DataModel
{
    public enum DataBehaviorOptions
    {
        None = 0,
        Definitions = 1,
        References = 1 << 1,
        Classifications = 1 << 2,
        SearchDefinitions = 1 << 3,
        SearchReferences = 1 << 4,
        Content = 1 << 5,
        All = Definitions | References | Classifications | SearchDefinitions | SearchReferences | Content,

        // Default does not include definitions since they can be queried lazily rather than eagerly retrieved.
        Default = References | Classifications | SearchDefinitions | SearchReferences | Content
    }

    internal static class DataBehavior
    {
        /// <summary>
        /// Removing definitions from inclusion to
        /// </summary>
        public static readonly DataBehaviorOptions Options = DataBehaviorOptions.Default;

        public static bool HasOption(DataBehaviorOptions option)
        {
            return (Options & option) == option;
        }
    }
}
