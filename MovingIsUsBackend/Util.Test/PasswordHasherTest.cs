using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace Utils.Test
{
    [TestClass]
    public class PasswordHasherTest
    {
        [TestMethod]
        public void CreateMD5HashTest()
        {
            string test = "test";
            string hash = PasswordHasher.CreateMD5Hash(test);
            Assert.AreNotEqual(hash, test);
        }
    }
}